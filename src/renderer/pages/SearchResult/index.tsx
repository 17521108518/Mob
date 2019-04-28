import React, { useState } from 'react';

import styles from './index.css';
import Content from '@/common/Content';
import {
  getSearchResult,
  Album,
  Doc,
  getSearchAlbumResult,
  AlbumResult,
  AlbumResponse,
  AlbumDoc,
} from '@/services/search';
import AlbumCard from '@/common/AlbumCard';
import { Button } from 'antd';

const formatDoc = (source: AlbumDoc) => {
  const {
    play,
    user_source,
    cover_path,
    title,
    uid,
    url,
    pinyin,
    category_id,
    intro,
    id,
    is_paid,
    is_finished,
    tags,
    category_title,
    isDraft,
    created_at,
    type,
    display_price_with_unit,
    last_uptrack_at_hour,
    discounted_price,
    is_v,
    refund_support_type,
    count_comment,
    score,
    price_type_id,
    updated_at,
    isVipFree,
    price,
    nickname,
    custom_title,
    verify_type,
    vipFreeType,
    priceUnit,
    display_discounted_price_with_unit,
    serialState,
    price_type_enum,
    tracks,
    comments_count,
    price_types,
    anchorUrl,
    richTitle,
  } = source;

  const result = {
    albumCoverPath: cover_path,
    albumId: id,
    albumPlayCount: play,
    albumTitle: title,
    albumTrackCount: tracks,
    albumUrl: url,
    albumUserNickName: nickname,
    anchorGrade: score,
    anchorId: uid,
    anchorUrl,
    intro,
    isDeleted: false,
    isFinished: is_finished,
    isPaid: is_paid,
  };
  return result;
};

interface AlbumsProps extends AlbumResult {
  onLoadMore: (params: any) => void;
}

const Albums = ({
  response: { currentPage, docs, numFound, pageSize, start, total, totalPage },
  responseHeader: {
    params: { q },
  },
  onLoadMore,
}: AlbumsProps) => {
  const handleLoadMore = () => {
    onLoadMore({ kw: q, page: currentPage + 1 });
  };
  const loadMore =
    currentPage < totalPage ? (
      <div>
        <Button onClick={handleLoadMore}>加载更多</Button>
      </div>
    ) : null;

  return (
    <div className={styles.contentWrap}>
      {docs.map((doc) => {
        const info = formatDoc(doc);
        return <AlbumCard key={info.albumId} info={info} />;
      })}
      {loadMore}
    </div>
  );
};

export default function({ match }) {
  const [params, setParams] = useState([match.params]);
  const handleLoadMore = (params) => {
    setParams([params]);
  };
  const genRequestList = ([params]) => {
    return [getSearchAlbumResult({ ...params })];
  };
  const rspHandler = (result) => {
    return result[0].data.result;
  };

  return (
    <div>
      <Content
        params={params}
        genRequestList={genRequestList}
        rspHandler={rspHandler}
        render={(props) => (
          <Albums {...props as AlbumResult} onLoadMore={handleLoadMore} />
        )}
      />
    </div>
  );
}
