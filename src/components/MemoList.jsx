import Memo from './Memo';

function MemoList({ memos, deleteMemo, updateMemo, toggleFavorite }) {
  return (
    <div>
      {memos.map((memo) => (
        <div key={memo.id} className="memo-item">
          <Memo 
            memo={memo} 
            deleteMemo={deleteMemo} 
            updateMemo={updateMemo}
            toggleFavorite={toggleFavorite}
          />
        </div>
      ))}
    </div>
  );
}

export default MemoList;
