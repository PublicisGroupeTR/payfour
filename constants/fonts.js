import {isIOS} from '../utils/platformUtil';

export const FontFamilies = {
  UBUNTU: {
    light: isIOS() ? 'Ubuntu-Light' : 'UbuntuLight',
    normal: isIOS() ? 'Ubuntu-Regular' : 'UbuntuRegular',
    medium: isIOS() ? 'Ubuntu-Medium' : 'UbuntuMedium',
    bold: isIOS() ? 'Ubuntu-Bold' : 'UbuntuBold',
  }
  // Adjust the above code to fit your chosen fonts' names
};