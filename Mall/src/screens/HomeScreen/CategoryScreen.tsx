import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import BtnGoBack from '../../components/BtnGoBack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../../config';
import ComponentProduct from '../../components/ComponentProduct';
const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;


const CategoryScreen = ({ route }: any) => {
    const navigation = useNavigation()
    const hanldeGoBack = () => {
        navigation.goBack()
    }
    let { item } = route.params;
    // console.log(item.category);

    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${BASE_URL}/category/${item.category}`)
            // console.log(res.data.data);

            let dataCategory = res && res.data ? res.data.data : [];
            setData(dataCategory);

        }
        getData()
    }, []);

    // console.log(data);

    return (
        <>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <BtnGoBack onPress={hanldeGoBack} />
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginLeft: 70
                }}>Category: {item.title}</Text>
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 20 }]}>
                    {data.map((item: any) => {
                        return (
                            <ComponentProduct
                                key={item.productID}
                                onPress={() => navigation.navigate('ProductInfo', { item: item })}
                                sourceImg={{ uri: item.productImage }}
                                title={item.title}
                                actualPrice={item.actualPrice}
                                oldPrice={item.oldPrice}
                                discount={item.discount}
                            />
                        )

                    })}
                </View>
            </ScrollView>

        </>
    );
};

export default CategoryScreen;

const styles = StyleSheet.create({
    container: { marginHorizontal: 20 },
    viewContent: {
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'red',
        marginVertical: 10
    },
    product: {
        borderRadius: 10,
        borderColor: '#EDEDED',
        backgroundColor: '#fafafa',
        width,
        height,
        alignItems: 'center'
    },
    title: {
        padding: 5,
        fontWeight: 'bold',
        marginVertical: 10
    }
});