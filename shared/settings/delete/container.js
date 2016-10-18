// @flow
import {TypedConnector} from '../../util/typed-connect'
import {navigateAppend} from '../../actions/route-tree'
import Delete from './index'

import type {TypedDispatch} from '../../constants/types/flux'
import type {TypedState} from '../../constants/reducer'
import type {Props} from './index'

const connector: TypedConnector<TypedState, TypedDispatch<{}>, {}, Props> = new TypedConnector()

export default connector.connect(
  (state, dispatch, ownProps) => {
    // FIXME: we need to load devices before this view is displayed so the current device exists in this collection
    const currentDevice = state.devices.devices && state.devices.devices.find(d => d.currentDevice)

    return {
      // FIXME: this needs to be updated to use showRemovePage action so endangeredTLFs is populated
      onRevokeCurrentDevice: () => { dispatch(navigateAppend([{selected: 'removeDevice', props: {device: currentDevice, endangeredTLFs: []}}])) },
      onDelete: () => { dispatch(navigateAppend(['deleteConfirm'])) },
    }
  }
)(Delete)
