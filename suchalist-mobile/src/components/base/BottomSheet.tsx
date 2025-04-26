import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {JSX, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  children: JSX.Element;
  ref: React.RefObject<BottomSheetModal | null>;
  onChange?: (index: number) => void;
};

const BottomSheet = ({children, ref, onChange}: Props) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={['50%', '80%']}
      backdropComponent={renderBackdrop}
      index={1}
      onChange={onChange}>
      <BottomSheetScrollView style={styles.contentContainer}>
        <SafeAreaView edges={['left', 'right', 'bottom']}>
          {children}
        </SafeAreaView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default BottomSheet;
