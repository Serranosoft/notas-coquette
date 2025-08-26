import { View, StyleSheet, Dimensions } from 'react-native';

export default function GridBackground({ contentHeight = 100 }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const extraHeight = Math.max(contentHeight, windowHeight);

    const lineSpacingX = 30;
    const lineSpacingY = 30;

    const numLinesX = Math.ceil(windowWidth / lineSpacingX);
    const numLinesY = Math.ceil(extraHeight / lineSpacingY);

    const renderHorizontalLines = () => {
        return Array.from({ length: numLinesY }).map((_, i) => (
            <View
                key={`horizontal-line-${i}`}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: i * lineSpacingY,
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
            />
        ));
    };

    const renderVerticalLines = () => {
        return Array.from({ length: numLinesX }).map((_, i) => (
            <View
                key={`vertical-line-${i}`}
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: i * lineSpacingX,
                    width: StyleSheet.hairlineWidth,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
            />
        ));
    };

    return (
        <View style={[styles.container, { height: extraHeight }]}>
            {renderHorizontalLines()}
            {renderVerticalLines()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
    },
});
