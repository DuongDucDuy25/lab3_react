import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addChiTieuAPI, deleteChiTieuAPI, updateChiTieuAPI, fetchChiTieu } from '../redux/Action/Action';
import { searchChiTieu, selectTotalThu, selectTotalChi } from '../redux/reducer/chitieuReducer';

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

    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editType, setEditType] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [idEdit, setIdEdit] = useState(null);

    useEffect(() => {
        dispatch(fetchChiTieu());
    }, [dispatch]);

    const handleAdd = () => {
        let newChiTieu = {
            title,
            description,
            date,
            type,
            amount: parseFloat(amount)
        };
        dispatch(addChiTieuAPI(newChiTieu))
        .then((result) => {
            console.log('Thêm thành công');
        }).catch((e) => {
            console.error('Thêm thất bại: ' + e);
        });
    };

    const handleDelete = async (id) => {
        dispatch(deleteChiTieuAPI(id))
        .then((result) => {
            console.log('Xóa thành công');
        }).catch((e) => {
            console.error('Lỗi: ' + e);
        });
    };

    const handleEdit = (item) => {
        setEditTitle(item.title);
        setEditDescription(item.description);
        setEditDate(item.date);
        setEditType(item.type);
        setEditAmount(item.amount.toString());
        setIdEdit(item.id);
    };

    const handleUpdate = () => {
        const duLieuUpdate = {
            id: idEdit,
            title: editTitle,
            description: editDescription,
            date: editDate,
            type: editType,
            amount: parseFloat(editAmount)
        };
        dispatch(updateChiTieuAPI({id : idEdit,data : duLieuUpdate}))
        .then((result) => {
            console.log('Cập nhật thành công');
            setEditTitle('');
            setEditDescription('');
            setEditDate('');
            setEditType('');
            setEditAmount('');
            setIdEdit(null);
        })
        .catch((error) => {
            console.error('Lỗi cập nhật:', error);
        });
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
                            onPress={() => handleEdit(item)}
                        >
                            <Text style={styles.buttonText}>Sửa</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            {idEdit !== null && (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Sửa tiêu đề"
                        value={editTitle}
                        onChangeText={setEditTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Sửa mô tả"
                        value={editDescription}
                        onChangeText={setEditDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Sửa ngày"
                        value={editDate}
                        onChangeText={setEditDate}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Sửa loại"
                        value={editType}
                        onChangeText={setEditType}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Sửa số tiền"
                        value={editAmount}
                        onChangeText={setEditAmount}
                        keyboardType="numeric"
                    />
                    <Button title="Lưu thay đổi" onPress={handleUpdate} />
                </View>
            )}
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
