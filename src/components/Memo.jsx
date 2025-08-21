import { useState } from 'react';

function Memo({ memo, deleteMemo, updateMemo, toggleFavorite }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(memo.text);

  const handleUpdate = () => {
    updateMemo(memo.id, updatedText);
    setIsEditing(false);
  };

  const getCategoryEmoji = (category) => {
    const emojiMap = {
      '일반': '📁',
      '업무': '💼',
      '개인': '👤',
      '아이디어': '💡'
    };
    return emojiMap[category] || '📂';
  };

  return (
    <>
      {isEditing ? (
        <div className="memo-item-editing">
          <textarea
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            rows="3"
          />
          <button onClick={handleUpdate} className="save-btn">✅ 저장</button>
        </div>
      ) : (
        <>
          <div className="memo-content">
            <div className="memo-header">
              <span className="memo-category">
                {getCategoryEmoji(memo.category)} {memo.category}
              </span>
              {memo.favorite && <span className="favorite-badge">⭐</span>}
            </div>
            <p>{memo.text}</p>
            <span className="timestamp">{new Date(memo.timestamp).toLocaleString()}</span>
          </div>
          <div className="buttons">
            <button 
              className={`icon-btn favorite-btn ${memo.favorite ? 'favorited' : ''}`} 
              onClick={() => toggleFavorite(memo.id)} 
              title={memo.favorite ? "즐겨찾기 해제" : "즐겨찾기"}
            >
              {memo.favorite ? '⭐' : '☆'}
            </button>
            <button className="icon-btn edit-btn" onClick={() => setIsEditing(true)} title="수정">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <button className="icon-btn delete-btn" onClick={() => deleteMemo(memo.id)} title="삭제">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Memo;
