import * as React from 'react';
import {Switch as PaperSwitch} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../../stores';
import {Theme} from '../../../stores/theme';
import {getColor} from '../../../constants/styles';

type Props = React.ComponentProps<typeof PaperSwitch>;

export default function Switch(props: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <PaperSwitch
      {...props}
      value={isSwitchOn}
      onValueChange={onToggleSwitch}
      color={getColor(theme, 500)}
    />
  );
}
