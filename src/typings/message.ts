import { DEFAULT_GLOBAL_SHORTCUT } from '../constants';

export interface IModifyHotkeyArgs {
  type: 'switch' | 'modify';
  payload: boolean | typeof DEFAULT_GLOBAL_SHORTCUT;
}
