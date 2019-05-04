import { PlayState, PlayMode } from './player';
import {
  getAlbum,
  DEFAULT_ALBUM_PAGE_NUM,
  DEFAULT_ALBUM_PAGE_SIZE,
} from '../services/play';
import { getTrackPageInfo } from '@/services/track';

const selectCurrentInfo = ({
  track: { currentIndex, playlist, hasMore },
  player: { playMode },
}) => {
  return { currentIndex, playlist, hasMore, playMode };
};

export enum Sort {
  ASC = -1,
  DESC = 1,
}

const initState = {
  albumId: '',
  hasMore: false,
  pageNum: DEFAULT_ALBUM_PAGE_NUM,
  pageSize: DEFAULT_ALBUM_PAGE_SIZE,
  sort: Sort.DESC,
  playlist: [],
  switchingTrack: null,
  currentTrack: null,
  currentIndex: 0,
};

const updatePlayStateAction = (payload) => {
  return {
    type: 'player/updateState',
    payload,
  };
};

export default {
  namespace: 'track',
  state: initState,
  effects: {
    *playAlbum({ payload }, { put, call }) {
      yield put(updatePlayStateAction({ playState: PlayState.LOADING }));
      const { albumId, index, trackId } = payload;
      try {
        const { data } = yield call(getAlbum, albumId);

        const { hasMore, pageNum, pageSize, sort, tracksAudioPlay } = data;

        let idx = 0;
        if (trackId && index !== undefined) {
          if (trackId === tracksAudioPlay[index].trackId) {
            idx = index;
          } else {
            const findIdx = tracksAudioPlay.findIndex(
              (item) => item.trackId === trackId,
            );
            if (findIdx !== -1) {
              idx = findIdx;
            }
          }
        }
        const currentTrack = tracksAudioPlay[idx];
        const info = {
          albumId,
          hasMore,
          pageNum,
          pageSize,
          sort,
          currentTrack,
          currentIndex: idx,
          playlist: tracksAudioPlay,
        };
        yield put({ type: 'updateTrack', payload: info });
      } catch (e) {
        // todo
      } finally {
        yield put(
          updatePlayStateAction({ playState: PlayState.PLAYING, played: 0 }),
        );
      }
    },
    // *playTrack({ payload }, { put, call }) {
    //   yield put(updatePlayStateAction({ playState: PlayState.LOADING }));
    //   const { albumId, index, trackId } = payload;
    //   const { data } = yield call(getAlbum, albumId);
    //   const { hasMore, pageNum, pageSize, sort, tracksAudioPlay } = data;
    //   const info = {
    //     trackId,
    //     hasMore,
    //     pageNum,
    //     pageSize,
    //     sort,
    //     currentTrack: tracksAudioPlay[0],
    //     playlist: tracksAudioPlay,
    //   };
    //   yield put({ type: 'updateTrack', payload: info });
    //   yield put(
    //     updatePlayStateAction({ playState: PlayState.PLAYING, played: 0 }),
    //   );
    // },
    *fetchMoreTracks(
      { payload: { isFromBtn = false } },
      { put, call, select },
    ) {
      try {
        const {
          pageNum,
          pageSize,
          sort,
          albumId,
          playlist,
          currentIndex,
        } = yield select(
          ({
            track: { pageNum, pageSize, sort, albumId, playlist, currentIndex },
          }) => ({
            pageNum,
            pageSize,
            sort,
            albumId,
            playlist,
            currentIndex,
          }),
        );
        const newPageNum = pageNum + 1;
        const { data } = yield call(
          getAlbum,
          albumId,
          newPageNum,
          pageSize,
          sort,
        );
        const { hasMore, tracksAudioPlay } = data;
        let payload;
        if (!isFromBtn) {
          const currentTrack = tracksAudioPlay[0];
          payload = {
            hasMore,
            currentTrack,
            currentIndex: currentIndex + 1,
            playlist: [...playlist, ...tracksAudioPlay],
          };
        } else {
          payload = {
            hasMore,
            playlist: [...playlist, ...tracksAudioPlay],
          };
        }
        yield put({ type: 'updateTrack', payload });
      } catch (e) {
        // todo
      } finally {
        // todo
      }
    },
    *next({ payload: { isFromBtn = false } }, { put, call, select }) {
      const { playlist, currentIndex, hasMore, playMode } = yield select(
        selectCurrentInfo,
      );

      if (playMode === PlayMode.SINGLE && !isFromBtn) {
        yield put({ type: 'player/updateState', payload: { played: 0.0 } });
        return;
      }

      let newIndex = currentIndex + 1;
      if (playMode === PlayMode.RANDOM) {
        newIndex = Math.round(Math.random() * (playlist.length - 1));
      } else {
        if (newIndex >= playlist.length) {
          if (hasMore) {
            yield put({
              type: 'fetchMoreTracks',
              payload: { isFromBtn: false },
            });
            return;
          } else {
            newIndex = 0;
          }
        }
      }
      const payload = {
        currentTrack: playlist[newIndex],
        currentIndex: newIndex,
      };
      yield put({ type: 'updateTrack', payload });
    },
    *prev({ payload: { isFromBtn = false } }, { put, call, select }) {
      const { playlist, currentIndex, hasMore, playMode } = yield select(
        selectCurrentInfo,
      );

      if (playMode === PlayMode.SINGLE && !isFromBtn) {
        yield put({ type: 'player/updateState', payload: { played: 0.0 } });
        return;
      }

      let newIndex = currentIndex - 1;
      if (playMode === PlayMode.RANDOM) {
        newIndex = Math.round(Math.random() * (playlist.length - 1));
      } else {
        if (newIndex < 0) {
          // todo fix index
          newIndex = playlist.length - 1;
        }
      }
      const payload = {
        currentTrack: playlist[newIndex],
        currentIndex: newIndex,
      };
      yield put({ type: 'updateTrack', payload });
    },
  },
  reducers: {
    updateTrack(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
  },
};
