import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Ionicons } from "@expo/vector-icons";
import MenuItem from '../Common/MenuItem';
import { COLORS } from '../../constants/theme';

const screenWidth = Dimensions.get('window').width; 

export function formatCurrency(amount) {
  const amountString = amount.toString();
  const amountArray = amountString.split('');
  const reversedArray = amountArray.reverse();
  let resultArray = [];
  for (let i = 0; i < reversedArray.length; i++) {
      if (i > 0 && i % 3 === 0) {
          resultArray.push('.');
      }
      resultArray.push(reversedArray[i]);
  }

  const formattedAmount = resultArray.reverse().join('');
  return formattedAmount + ' VNĐ';
}

const CheckAvailabilityModal = ({
  isOpen,
  onClose,
  tourDetail,
  handleAddToCart,
  handleBookNow,
  isLoading = false,
}) => {
  console.log(tourDetail.priceOptions)
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [initialMount, setInitialMount] = useState(true);
  const [guestInfo, setGuestInfo] = useState([]);
  const [showDate, setShowDate] = useState([]);
  const [convertedDate, setConvertedDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDropdownParticipantVisible, setIsDropdownParticipantVisible] = useState(false);
  const [isDropdownCalendarVisible, setIsDropdownCalendarVisible] = useState(false);

  const toggleDropdownParticipant = () => setIsDropdownParticipantVisible(!isDropdownParticipantVisible);
  const toggleDropdownCalendar = () => setIsDropdownCalendarVisible(!isDropdownCalendarVisible);

  useEffect(() => {
    if (!initialMount) {
      const existingGuestIndex = guestInfo.findIndex(
        (obj) => obj.title === type
      );

      if (existingGuestIndex !== -1) {
        const updatedGuestInfo = [...guestInfo];
        updatedGuestInfo[existingGuestIndex] = {
          ...updatedGuestInfo[existingGuestIndex],
          quantity,
          price,
        };
        const filterGuest = updatedGuestInfo.filter(
          (obj) => obj.quantity !== 0 && !!obj.title
        );
        setGuestInfo(filterGuest);
      } else {
        const newGuest = {
          title: type,
          quantity: quantity,
          price: price,
        };
        setGuestInfo((prevGuestInfo) => [...prevGuestInfo, newGuest]);
      }
    } else {
      setInitialMount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, quantity, price]);

  useEffect(() => {
    if (guestInfo.length === 0) {
      setTotalPrice(0);
      return;
    }
    let totalPrice = 0;

    guestInfo.forEach((guest) => {
      totalPrice += guest.price;
    });
    setTotalPrice(totalPrice);
  }, [guestInfo]);

  useEffect(() => {
    if (!selectedDate) return;
    var date = new Date(selectedDate.toString());

    var formattedDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);

    const showDate = selectedDate.toString().split(" ").slice(0, 3);
    setShowDate(showDate);
    setConvertedDate(formattedDate.toString());
  }, [selectedDate]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
    <ScrollView>

      <View style={styles.modalView}>
        <View style={styles.tourDetails}>
            <TouchableOpacity onPress={onClose} >
              <Text style={styles.closeBtn}>X</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.vStack}>
            {/* Menu Button */}
            <TouchableOpacity
              style={styles.menuButton}
              onPress={toggleDropdownParticipant}
            >
              <View style={styles.hStack}>
                <View style={styles.innerHStack}>
                  <Ionicons name='people' size={24} color={COLORS.black}/>
                  <Text style={styles.guestText}>
                    Select participant
                  </Text>
                </View>
                <Ionicons name={isDropdownParticipantVisible ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.black}/>
              </View>
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {isDropdownParticipantVisible && (
              <ScrollView contentContainerStyle={styles.menuList}>
                {tourDetail?.priceOptions &&
                  tourDetail?.priceOptions.map((participant) => (
                    <MenuItem
                      key={participant._id}
                      type={participant.title}
                      price={participant.value}
                      setPrice={setPrice}
                      setType={setType}
                      setQuantity={setQuantity}
                    />
                  ))}
              </ScrollView>
            )}

            <TouchableOpacity
              style={styles.menuButton}
              onPress={toggleDropdownCalendar}
            >
              <View style={styles.hStack}>
                <View style={styles.innerHStack}>
                  <Ionicons name='calendar' size={24} color={COLORS.black}/>
                  <Text style={styles.guestText}>
                    {showDate && (
                      <Text style={styles.selectedDateText}>
                        Selected Date: {showDate.toString()}
                      </Text>
                    )}
                  </Text>
                </View>
                <Ionicons name={isDropdownCalendarVisible ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.black}/>
              </View>
            </TouchableOpacity>

            {isDropdownCalendarVisible && (
              <View style={styles.calendarWrapper}>
               <CalendarPicker
                 onDateChange={setSelectedDate}
                 previousTitle="<"
                 nextTitle=">"
                 width={screenWidth * 0.8} 
                 customStyles={{
                   dayText: {
                     fontSize: 14,
                     color: '#333',
                   },
                   selectedDayText: {
                     fontWeight: 'bold',
                     color: '#ffffff',
                   },
                   selectedDayBackgroundColor: '#009688',
                   monthTitleTextStyle: {
                     color: '#333333',
                     fontWeight: 'bold',
                     fontSize: 16,
                   },
                   weekDayTextStyle: {
                     color: '#009688',
                     fontWeight: 'bold',
                     fontSize: 14,
                   },
                   headerWrapperStyle: {
                     backgroundColor: '#f0f0f0',
                     paddingHorizontal: 15,
                   },
                   dayWrapperStyle: {
                     borderRadius: 25,
                   },
                 }}
               />
             </View>
            )}
          </View>
          
        <View style={styles.priceBreakdown}>
          <Text style={styles.priceTitle}>Price breakdown</Text>
          {guestInfo?.map((guest) => (
            <View key={guest.title} style={styles.priceRow}>
              <Text style={styles.guestInfo}>
                {guest.title} {guest.quantity} x {formatCurrency(guest.price / guest.quantity)}
              </Text>
              <Text style={styles.guestInfo}>
                {guest.price && formatCurrency(guest.price)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalContainer}>
          <View>
            <Text style={styles.totalLabel}>Total price</Text>
            <Text style={styles.totalPrice}>
              {totalPrice !== 0 ? `${formatCurrency(totalPrice)}` : "0 VND"}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}> 
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddToCart}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Add to cart</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleBookNow}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Book now</Text>
              )}
            </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeBtn: {
    textAlign: 'right',
    fontSize: 24
  },
  tourDetails: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  tourTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
  },
  priceBreakdown: {
    marginTop: 16,
  },
  priceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  guestInfo: {
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 24,
    backgroundColor: '#EBEEF1',
    padding: 16,
    borderRadius: 15,
    alignItems: 'left',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%',
    marginTop: 10, 
  },
  button: {
    backgroundColor: 'teal',
    borderRadius: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1, 
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vStack: {
    padding: 10,
    width: '100%',
  },
  menuButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  hStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerHStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  menuList: {
    minWidth: 320,
    padding: 10,
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    padding: 10,
    marginBottom: 20,
  }
});

export default CheckAvailabilityModal;
