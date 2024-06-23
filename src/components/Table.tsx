import './Table.css';
import Card from './Card';
import { useEffect, useState } from 'react';
import dataOfPosts from '../data/posts.json';

export interface PostsType {
  title:string
  views:number
  upload_date:string
  bookmark:boolean
}

function Table({ orderType }:any) {
  const [posts, setPosts] = useState<PostsType[]>([]);

  const orderViewCount = (data:PostsType[]) => {
    const sortedData = [...data].sort((a, b) => {
      if (a.bookmark && !b.bookmark) return -1;
      if (!a.bookmark && b.bookmark) return 1;

      const viewA = a.views;
      const viewB = b.views;

      return viewB - viewA;
    });

    setPosts(sortedData);
  };

  const orderLatest = (data:PostsType[]) => {
    const sortedData = [...data].sort((a, b) => {
      if (a.bookmark && !b.bookmark) return -1;
      if (!a.bookmark && b.bookmark) return 1;

      const dataA = new Date(a.upload_date);
      const dataB = new Date(b.upload_date);

      return dataB.getTime() - dataA.getTime();
    });

    setPosts(sortedData);
  };

  const fetchData = (data:PostsType[]) => {
    // 1. 최근 등록순
    if (orderType === '1') {
      orderLatest(data);
      return;
    }
    // 2. 조회순
    if (orderType === '2') {
      orderViewCount(data);
      return;
    }

    setPosts(data);
  };

  useEffect(() => {
    fetchData(dataOfPosts as PostsType[]);
  }, [orderType]);

  return (
    <>
      {posts.map(({ title, views, upload_date, bookmark }, index) => {
        return <Card key={`card-${upload_date}-${index}`} date={upload_date} title={title} viewCount={views} isBookmarked={bookmark} />;
      })}
      </>
  );
}

export default Table;
