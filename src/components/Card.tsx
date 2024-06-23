import './Card.css';
import { PostsType } from './Table';

interface CardProps {
  date:string;
   title:string; 
   viewCount:number;
   isBookmarked:boolean; 
}

function Card({ date, title, viewCount, isBookmarked = false }:CardProps) {
  return (
      <li className="card--container" id="card1">
        <div className="header">
          <div className="card--tag">
            <span className="upload-date">{date}</span>
          </div>
          <div className="card--tag">
            <span className="icon bookmark">
              <i className="fa fa-bookmark" style={{ color: isBookmarked ? 'red' : '#fff' }}></i>
            </span>
          </div>
        </div>
        <div className="card--content">
          <span className="title">{title}</span>
        </div>
        <div className="footer">
          <div className="card--tag">
            <span className="views">{viewCount}</span>
            views
          </div>
        </div>
      </li>
  );
}

export default Card;
