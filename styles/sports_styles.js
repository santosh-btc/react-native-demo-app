import {
  StyleSheet
} from 'react-native';

const sports_styles = StyleSheet.create({
  row_container:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  col_container:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding:10
  },
  flex_col_container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row_space:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
 flex_col_container1:{
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin:20
 }
});

module.exports = sports_styles