import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

export default function PantallaCatalogoProductos() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/products/get');
                if (response.status === 200) {
                    setProducts(response.data as Product[]);
                }
            } catch (err) {
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
                <Text style={styles.categoryText}>{item.category}</Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.cardContainer}>
                    <View style={styles.topBar}>
                        <Text style={styles.logo}>Segurix</Text>
                    </View>
                    <Text style={styles.title}>Catálogo de Productos</Text>
                    <FlatList
                        data={products}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item._id}
                        scrollEnabled={false}
                        contentContainerStyle={styles.listContent}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 20,
    },
    topBar: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    productCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 8,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
    },
    categoryText: {
        fontSize: 14,
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#dc3545',
        fontSize: 16,
    },
    listContent: {
        width: '100%',
    },
});