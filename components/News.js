import React, { useState, useEffect } from 'react'
import {View, StyleSheet, Text, ActivityIndicator, FlatList,Dimensions} from 'react-native'
const {width,height} = Dimensions.get('window')


export default function News() {
    let [news, setNews] = useState([])
    let [loading, setLoading] = useState('true')

    const setLoadingHandler = (text) => {
        setLoading(text)
    }

    const Newsfeed = () => {
        <FlatList
            data={news}
            renderItem={({item})=>{
                return(
                    <View style ={{width:width-50,height:180,backgroundCOlor:'#fff',marginBottom:15}}>

                    </View>
                )}}
        />
    }

    const getNews = async() => {
        let res = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=f5037afaa4c647dfa836977a061e09e8')
        const data = await res.json()
                
                console.log(data.articles)

                setNews(data.articles)

                // console.log(news)

                setLoadingHandler = 'false'
    }

        // getNews()
    useEffect ( () => {
            let interval;     
            
            interval = setInterval(() => {
                
                // newshandlers();
                  
                    console.log("daniel")
                    if(loading){
                        return (
                            <View Style= {{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#333'}}>
                                <ActivityIndicator size='large' colors='#fff'/>
                            </View> 
                        );
                    }
                    else{
                        return(   
                            <FlatList
                                data={news}
                                renderItem={({item})=>{
                                return(
                                    <View style ={{width:width-50,height:180,backgroundCOlor:'#fff',marginBottom:15}}>

                                    </View>
                                )}}
                            />      
                        )
                    }
                
            },1000000)
            
            return () => clearInterval(interval);
        }, [news]);
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize:25, color:'#fff'}}>Top Headline</Text>
                <Text style={{fontSize:35,color:'#fff'}}>Headline</Text>
            
            </View>
            <View style={styles.news}> 
                
            </View>
        </View>
    )
    
        
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'#333'
    },
    header:{
        padding:30
    },
    news:{
        alignSelf: 'center'
    }
})
