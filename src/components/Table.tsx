import './Table.css';
import Card from './Card';
import { useEffect, useState } from 'react';
import dataOfPosts from '../data/posts.json';
import { OrderType } from '../App';

export interface PostsType {
  title:string
  views:number
  upload_date:string
  bookmark:boolean
}



function Table({ orderType }:{orderType:OrderType}) {
  const [posts, setPosts] = useState<PostsType[]>(dataOfPosts);

  const handleBookmark= (index: number)=> {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index] = { ...updatedPosts[index], bookmark: !updatedPosts[index].bookmark };
      return sortData(updatedPosts);
    });
  }

  const orderViewCount = (data:PostsType[]) => {
    return [...data].sort((a, b) => {
      if (a.bookmark && !b.bookmark) return -1;
      if (!a.bookmark && b.bookmark) return 1;
      return b.views - a.views;
    });
  };

  const orderLatest = (data:PostsType[]) => {
    return [...data].sort((a, b) => {
      if (a.bookmark && !b.bookmark) return -1;
      if (!a.bookmark && b.bookmark) return 1;
      return new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime();
    });
  };

  const sortByType = {
    '1':(data: PostsType[])=>orderLatest(data),
    '2':(data: PostsType[])=>orderViewCount(data)
  }
  const sortData = (data:PostsType[]) => {
    if (!Array.isArray(data)) return dataOfPosts;

    return sortByType[orderType] ? sortByType[orderType](data) : data ;
  };

  useEffect(() => {
    setPosts((prevPosts) => sortData(prevPosts));
  }, [orderType]);

  return (
    <>
      {posts && posts.map(({ title, views, upload_date, bookmark }, index) => {
        return <Card key={`card-${upload_date}-${index}`} date={upload_date} title={title} viewCount={views} isBookmarked={bookmark} 
        handleBookmark={handleBookmark}
        index={index}
        />;
      })}
      </>
  );
}

export default Table;
