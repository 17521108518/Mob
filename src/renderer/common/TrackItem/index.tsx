import React, { memo, useState } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less';
import { PlayState } from '@/models/player';
import { List, Skeleton, message } from 'antd';
import { CustomIcon } from '@/components/CustomIcon';
import { Track } from '@/services/album';
import { setLikeTrack, cancelLikeTrack } from '@/services/like';
import PayTag from '@/components/PayTag';

interface TrackItemProps {
  index: number;
  track: Track;
  albumId: string | number;
  pageNum?: number;
  pageSize?: number;
  trackTotalCount?: number;
  isCurrent?: boolean;
  isCurrentAlbum: boolean;
  playState?: PlayState;
  playTrack?: ({ trackId }: { trackId: string | number }) => void;
  playAlbum: ({
    albumId,
    index,
    trackId,
  }: {
    albumId: string | number;
    index: number;
    trackId: number;
  }) => void;
  playPauseTrack: (isPlaying: boolean) => void;
  // setLike: ({
  //   index,
  //   trackId,
  // }: {
  //   index: number;
  //   trackId: number | string;
  // }) => void;
}

const TrackItem: React.FC<TrackItemProps> = memo(
  ({
    index,
    track,
    albumId,
    pageNum,
    pageSize,
    trackTotalCount,
    isCurrent,
    isCurrentAlbum,
    playState,
    playTrack,
    playAlbum,
    playPauseTrack,
    // setLike,
  }) => {
    const {
      createDateFormat,
      isLike: like,
      isPaid,
      playCount,
      trackId,
      url,
    } = track;
    const [isLike, setLike] = useState(like);
    const [isInside, setInside] = useState(false);
    const isPlaying = playState === PlayState.PLAYING;
    const handleItemMouseLeave = (e) => {
      setInside(false);
    };
    const handleItemMouseEnter = (e) => {
      setInside(true);
    };

    const handleItemClick = () => {
      if (isCurrent) {
        playPauseTrack(isPlaying);
      } else {
        playAlbum({ albumId, index, trackId });
      }
    };

    const handleClickLike = async () => {
      try {
        let rsp;
        if (isLike) {
          rsp = await cancelLikeTrack(trackId);
        } else {
          rsp = await setLikeTrack(trackId);
        }
        if (rsp.ret === 200) {
          setLike(!isLike);
        }
      } catch (e) {
        message.error('操作失败，请稍后重试！');
      }
    };

    return (
      <List.Item
        actions={[
          <CustomIcon
            className={styles.like}
            type={isLike ? 'icon-heart-full' : 'icon-heart-empty'}
            onClick={handleClickLike}
          />,
        ]}
        onMouseEnter={handleItemMouseEnter}
        onMouseLeave={handleItemMouseLeave}
      >
        <Skeleton title={false} loading={false} active>
          <div onClick={handleItemClick} className={styles.itemWrap}>
            <span className={styles.itemWidget}>
              {isInside ? (
                isCurrent && isPlaying ? (
                  <CustomIcon type='icon-pause' />
                ) : (
                  <CustomIcon type='icon-play' />
                )
              ) : (
                <span> {index}</span>
              )}
            </span>
            <span className={styles.itemTitle}>
              {isPaid && <PayTag />}
              {track.title}
            </span>
          </div>
        </Skeleton>
      </List.Item>
    );
  },
);

const mapStateToProps = (
  { track: { currentTrack, albumId: curAlbumId }, player: { playState } },
  { track, albumId },
) => {
  const isCurrent = currentTrack.trackId === track.trackId;
  const isCurrentAlbum = curAlbumId === albumId;
  return {
    isCurrent,
    isCurrentAlbum,
    playState: isCurrent ? playState : undefined,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    playTrack(payload) {
      dispatch({ type: 'track/playTrack', payload });
    },
    playAlbum(payload) {
      dispatch({ type: 'track/playAlbum', payload });
    },
    playPauseTrack(isPlaying) {
      const payload = {
        playState: isPlaying ? PlayState.PAUSE : PlayState.PLAYING,
      };
      dispatch({ type: 'player/updateState', payload });
    },
    setLike(payload) {
      dispatch({ type: 'track/setLike', payload });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackItem);
