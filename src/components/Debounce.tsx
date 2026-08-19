import { useEffect, useState } from "react";
import FeatureLayout from "./FeatureLayout";

const Debounce = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[ ]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (search.length === 0) {
      setFilteredData(comments);
      return;
    }

    if (search.length < 3) {
      return;
    }

    let timer = setTimeout(() => {
      console.log("inside the timeout");
      let filtered = comments.filter((data) => {
        return (
          data.email.toLowerCase().includes(search) ||
          data.name.toLowerCase().includes(search)
        );
      });
      setFilteredData(filtered);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search , comments]);

  const getComments = async () => {
    let data = await fetch(
      "https://jsonplaceholder.typicode.com/comments",
    ).then((response) => response.json());
    setComments(data);
    setFilteredData(data);
  };

  return (
    <FeatureLayout
      title="Debounce"
      description="Explore delayed input handling and optimized event flow with live JSONPlaceholder data."
      badge="Utility"
    >
      <div className="debounce-page">
        <div className="debounce-card">
          <div className="debounce-header-bar">
            <span className="debounce-header-title">Live Comment Filter</span>
            <span className="debounce-counter-badge">
              {filteredData ? `${filteredData.length} comments` : "Loading..."}
            </span>
          </div>

          <div className="debounce-search-wrap">
            <input
              type="text"
              placeholder="Type at least 3 characters to search by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <div className="debounce-search-hint">
              <span>⏱</span> 1000ms debounce delay applies after 3+ characters typed.
            </div>
          </div>

          <div className="debounce-list" role="list">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((comment: any) => (
                <div className="debounce-item" key={comment.id} role="listitem">
                  <span className="debounce-email">{comment.email}</span>
                  <span className="debounce-name">{comment.name}</span>
                </div>
              ))
            ) : (
              <div className="debounce-empty">
                {comments.length === 0 ? "Fetching comments from API..." : "No matching comments found."}
              </div>
            )}
          </div>
        </div>
      </div>
    </FeatureLayout>
  );
};

export default Debounce;
