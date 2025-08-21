import { useState } from 'react';
import MemoList from './components/MemoList';
import MemoForm from './components/MemoForm';
import './App.css';

function App() {
  const [memos, setMemos] = useState([
    { id: 1, text: '메모 예시 1', timestamp: new Date(), category: '일반', favorite: false },
    { id: 2, text: '메모 예시 2', timestamp: new Date(), category: '일반', favorite: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const addMemo = (text, category = '일반') => {
    const newMemo = {
      id: Date.now(),
      text,
      timestamp: new Date(),
      category,
      favorite: false,
    };
    setMemos([...memos, newMemo]);
  };

  const deleteMemo = (id) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  const updateMemo = (id, updatedText) => {
    setMemos(
      memos.map((memo) =>
        memo.id === id ? { ...memo, text: updatedText } : memo
      )
    );
  };

  const toggleFavorite = (id) => {
    setMemos(
      memos.map((memo) =>
        memo.id === id ? { ...memo, favorite: !memo.favorite } : memo
      )
    );
  };

  // 필터링된 메모들
  const filteredMemos = memos.filter((memo) => {
    const matchesSearch = memo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || memo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 카테고리 목록
  const categories = ['전체', ...new Set(memos.map(memo => memo.category))];

  return (
    <div className="App">
      <h1>📝 메모 📝</h1>
      
      {/* 검색 및 필터 */}
      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="메모 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <MemoForm addMemo={addMemo} categories={categories.filter(c => c !== '전체')} />
      
      <div className="memo-list-container">
        {filteredMemos.length > 0 ? (
          <MemoList 
            memos={filteredMemos} 
            deleteMemo={deleteMemo} 
            updateMemo={updateMemo}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <p className="no-memos-message">
            {searchTerm || selectedCategory !== '전체' 
              ? '검색 결과가 없습니다.' 
              : '작성된 메모가 없습니다.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;