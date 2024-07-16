import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addChiTieu, deleteChiTieu, updateChiTieu, searchChiTieu, selectTotalThu, selectTotalChi } from '../redux/reducer/chitieuReducer';

const ChiTieuScreen = () => {
    const dispatch = useDispatch();
    const listChitieu = useSelector(state => state.chitieu.listChitieu);
    const totalThu = useSelector(selectTotalThu);
    const totalChi = useSelector(selectTotalChi);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [search, setSearch] = useState('');

    const handleAdd = () => {
        const newChiTieu = {
            id: Date.now().toString(),
            title,
            description,
            date,
            type,
            amount: parseFloat(amount)
        };
        dispatch(addChiTieu(newChiTieu));
    };

    const handleDelete = (id) => {
        dispatch(deleteChiTieu(id));
    };

    const handleUpdate = (id) => {
        const updatedChiTieu = {
            id,
            title,
            description,
            date,
            type,
            amount: parseFloat(amount)
        };
        dispatch(updateChiTieu(updatedChiTieu));
    };

    const handleSearch = () => {
        dispatch(searchChiTieu(search));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tiêu đề"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Mô tả"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Ngày"
                value={date}
                onChangeText={setDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Loại (thu/chi)"
                value={type}
                onChangeText={setType}
            />
            <TextInput
                style={styles.input}
                placeholder="Số tiền"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
            <Button title="Thêm Chi Tiêu" onPress={handleAdd} />
            <TextInput
                style={styles.input}
                placeholder="Tìm kiếm theo tiêu đề"
                value={search}
                onChangeText={setSearch}
            />
            <Button title="Tìm kiếm" onPress={handleSearch} />
            <View style={styles.totalsContainer}>
                <Text style={styles.totalText}>Tổng thu: {totalThu}</Text>
                <Text style={styles.totalText}>Tổng chi: {totalChi}</Text>
            </View>
            <FlatList
                data={listChitieu}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.title}</Text>
                        <Text style={styles.itemText}>{item.description}</Text>
                        <Text style={styles.itemText}>{item.date}</Text>
                        <Text style={styles.itemText}>{item.type}</Text>
                        <Text style={styles.itemText}>{item.amount}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.buttonText}>Xóa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleUpdate(item.id)}
                        >
                            <Text style={styles.buttonText}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    totalsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    itemText: {
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ChiTieuScreen;
