import { useState } from 'react';

function MemoForm({ addMemo, categories = [] }) {
  const [memo, setMemo] = useState('');
  const [category, setCategory] = useState('일반');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memo.trim()) return;
    
    const finalCategory = showNewCategory && newCategory.trim() 
      ? newCategory.trim() 
      : category;
    
    addMemo(memo, finalCategory);
    setMemo('');
    setNewCategory('');
    setShowNewCategory(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="새 메모 입력"
          className="memo-textarea"
        />
        
        <div className="form-controls">
          <div className="category-selector">
            <select 
              value={showNewCategory ? 'new' : category}
              onChange={(e) => {
                if (e.target.value === 'new') {
                  setShowNewCategory(true);
                } else {
                  setShowNewCategory(false);
                  setCategory(e.target.value);
                }
              }}
              className="category-select"
            >
              <option value="일반">📁 일반</option>
              <option value="업무">💼 업무</option>
              <option value="개인">👤 개인</option>
              <option value="아이디어">💡 아이디어</option>
              {categories.map(cat => 
                !['일반', '업무', '개인', '아이디어'].includes(cat) && (
                  <option key={cat} value={cat}>📂 {cat}</option>
                )
              )}
              <option value="new">➕ 새 카테고리</option>
            </select>
            
            {showNewCategory && (
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="카테고리 이름..."
                className="new-category-input"
              />
            )}
          </div>
          
          <button type="submit" className="add-button">
            ✨ 추가
          </button>
        </div>
      </div>
    </form>
  );
}

export default MemoForm;
