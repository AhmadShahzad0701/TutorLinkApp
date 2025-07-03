import { FontAwesome6, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tutors from '../data'; // make sure path is correct

const HomeScreen = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.subHeading}>Welcome to Tutor Link</Text>
            <Text style={styles.heading}>Find the Right Tutor For You!</Text>

            <TouchableOpacity style={styles.tutorCard} onPress={() => router.push('/screens/EditProfile')}>
                <FontAwesome6 name="user-plus" size={22} color="#black" />
                <View style={styles.tutorCardTextWrapper}>
                    <Text style={styles.tutorCardTitle}>Become a Tutor</Text>
                    <Text style={styles.tutorCardSubtitle}>
                        Register as a tutor and start teaching now.
                    </Text>
                </View>
                <FontAwesome6 name="chevron-right" size={18} color="#6b7280" />
            </TouchableOpacity>

            <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                    <MaterialCommunityIcons name="apps" size={20} color="#333" />
                    <Text style={styles.sectionTitle}>Categories</Text>
                </View>

                <View style={styles.categoriesRow}>
                    <TouchableOpacity style={styles.categoryBox}>
                        <SimpleLineIcons name="chemistry" size={28} color="#7C8BA5" />
                        <Text style={styles.categoryText}>Chemistry</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBox}>
                        <MaterialCommunityIcons name="math-compass" size={28} color="#7C8BA5" />
                        <Text style={styles.categoryText}>Math</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBox}>
                        <FontAwesome6 name="dna" size={28} color="#7C8BA5" />
                        <Text style={styles.categoryText}>Biology</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.categoriesRow}>
                    <TouchableOpacity style={styles.categoryBox}>
                        <FontAwesome6 name="language" size={28} color="#7C8BA5" />
                        <Text style={styles.categoryText}>Language</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBox}>
                        <FontAwesome6 name="book-open-reader" size={28} color="#7C8BA5" />
                        <Text style={styles.categoryText}>Philosophy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBox}>
                        <FontAwesome6 name="atom" size={28} color="#7C8BA5" />
                        <Text style={styles.categoryText}>Physics</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                    <FontAwesome6 name="user-graduate" size={20} color="#333" />
                    <Text style={styles.sectionTitle}>Recommended Teachers</Text>
                </View>

                {/* Cards */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                    {tutors.map((tutor, index) => (
                        <View key={index} style={styles.teacherCard}>
                            <Image source={{ uri: tutor.imageUrl }} style={styles.teacherImage} />
                            <Text style={styles.teacherName}>{tutor.name}</Text>
                            <Text style={styles.teacherInfo}>{tutor.subject} • {tutor.rating}★</Text>
                            <Text style={styles.teacherInfo}>{tutor.location}</Text>
                            <Text style={styles.teacherPrice}>Rs {tutor.price}/hr</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
        flex: 1,
    },
    subHeading: {
        fontSize: 14,
        color: 'grey',
        fontWeight: '600',
        marginBottom: 5,
    },
    heading: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    section: {
        marginTop: 20,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B6BED0',
        borderRadius: 10,
        height: 35,
        paddingHorizontal: 12,
        gap: 8,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
    tutorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEFF5',
        padding: 16,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    tutorCardTextWrapper: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },
    tutorCardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    tutorCardSubtitle: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 4,
    },
    categoriesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 20,
    },
    categoryBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#F2F2F2',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryText: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },

    teacherCard: {
        width: 140,
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        padding: 10,
        marginRight: 12,
        alignItems: 'center',
    },
    teacherImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 8,
    },
    teacherName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
    },
    teacherInfo: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
    },
    teacherPrice: {
        fontSize: 12,
        color: '#4B5563',
        textAlign: 'center',
        marginTop: 2,
    },
});
