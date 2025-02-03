import { SuccessModalPropTypes } from "../types";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const SuccessModal = ({
    completedTimersQueue,
    onClose,
}: SuccessModalPropTypes) => {
    const currentTimer = completedTimersQueue[0];

    return (
        <Modal visible={true} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        🎉 Timer Completed! 🎉
                    </Text>
                    <Text style={styles.modalText}>
                        "{currentTimer.name}" has finished!
                    </Text>
                    <Button title="OK" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

export default SuccessModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
});
