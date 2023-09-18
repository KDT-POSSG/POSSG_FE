import React from 'react';

function HomeModalList({ type, list, handleMoveToLeft, handleMoveToRight }) {
  return (
    <div className='modal-item-container'>
      {
        list && list.map((item) => (
          <React.Fragment key={item.seq}>
            <div className={`home-modal-item ${type}`}>
              <div 
                className={`${type}-circle`} 
                onClick={() => handleMoveToLeft ? handleMoveToLeft(item) : handleMoveToRight(item)}
              >
                <span className="material-symbols-rounded">
                  {type === "enable" ? "remove" : "add"}
                </span>
              </div>
              <div>{item.pageName}</div>
            </div>
            <hr />
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default HomeModalList;