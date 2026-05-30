import { useMemo, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ManipulationList from "./components/ManipulationList";
import ManipulationPage from "./components/ManipulationPage";
import { categories, manipulations } from "./data/manipulations";
import styles from "./App.module.css";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedManipId, setSelectedManipId] = useState(null);

  const countsByCategory = useMemo(() => {
    const counts = Object.fromEntries(categories.map((category) => [category.id, 0]));
    manipulations.forEach((manip) => {
      if (counts[manip.category] !== undefined) {
        counts[manip.category] += 1;
      }
    });
    return counts;
  }, []);

  const filteredManipulations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return manipulations.filter((manip) => {
      if (activeCategory !== "all" && manip.category !== activeCategory) return false;
      if (!query) return true;

      return (
        manip.title.toLowerCase().includes(query) ||
        manip.category.toLowerCase().includes(query) ||
        manip.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        manip.tips?.toLowerCase().includes(query) ||
        manip.warning?.toLowerCase().includes(query) ||
        manip.steps?.some((step) =>
          step.text?.toLowerCase().includes(query) ||
          step.subSteps?.some((subStep) => subStep.toLowerCase().includes(query))
        )
      );
    });
  }, [activeCategory, searchQuery]);

  const selectedIndex = useMemo(
    () => filteredManipulations.findIndex((manip) => manip.id === selectedManipId),
    [filteredManipulations, selectedManipId]
  );

  const selectedManipulation = selectedManipId
    ? manipulations.find((manip) => manip.id === selectedManipId) ?? null
    : null;

  const activeCategoryData = categories.find((category) => category.id === activeCategory) ?? null;

  const openManipulation = (id) => {
    setSelectedManipId(id);
  };

  const closeManipulation = () => {
    setSelectedManipId(null);
  };

  const goPrevious = () => {
    if (selectedIndex > 0) {
      setSelectedManipId(filteredManipulations[selectedIndex - 1].id);
    }
  };

  const goNext = () => {
    if (selectedIndex >= 0 && selectedIndex < filteredManipulations.length - 1) {
      setSelectedManipId(filteredManipulations[selectedIndex + 1].id);
    }
  };

  const showAll = () => {
    setActiveCategory("all");
    setSelectedManipId(null);
  };

  const totalVisible = filteredManipulations.length;

  return (
    <div className={styles.app}>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={(value) => {
          setSearchQuery(value);
          setSelectedManipId(null);
        }}
        totalCount={manipulations.length}
      />

      <div className={styles.layout}>
        <Sidebar
          categories={categories.map((category) => ({
            ...category,
            totalCount: countsByCategory[category.id] ?? 0,
          }))}
          activeCategory={activeCategory}
          setActiveCategory={(categoryId) => {
            setActiveCategory(categoryId);
            setSelectedManipId(null);
          }}
          countsByCategory={filteredManipulations.reduce((acc, manip) => {
            acc[manip.category] = (acc[manip.category] ?? 0) + 1;
            return acc;
          }, {})}
          totalVisible={totalVisible}
          totalCount={manipulations.length}
          onShowAll={showAll}
        />

        <main className={styles.main}>
          {selectedManipulation ? (
            <ManipulationPage
              manip={selectedManipulation}
              category={activeCategoryData ?? categories.find((category) => category.id === selectedManipulation.category)}
              onBack={closeManipulation}
              onPrevious={selectedIndex > 0 ? goPrevious : null}
              onNext={selectedIndex >= 0 && selectedIndex < filteredManipulations.length - 1 ? goNext : null}
              previousLabel={selectedIndex > 0 ? filteredManipulations[selectedIndex - 1].title : ""}
              nextLabel={selectedIndex >= 0 && selectedIndex < filteredManipulations.length - 1 ? filteredManipulations[selectedIndex + 1].title : ""}
            />
          ) : (
            <ManipulationList
              categories={categories}
              manipulations={manipulations}
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              onOpenManipulation={openManipulation}
            />
          )}
        </main>
      </div>
    </div>
  );
}
