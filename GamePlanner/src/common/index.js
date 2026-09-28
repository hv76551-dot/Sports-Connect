import CircleHeaderComponent from './CircleHeader';
import ImagePath from './ImageAssets';
import MainContainer from './MainContainer';
import Colors from './Colors';
import { font_style } from './MyStyle';
import Input from '../component/MyTextInput';
import Button from '../component/MyButton';
import KeyBoardType from './KeyBoardType';
import Header from '../component/Header';
import HeaderBar from '../component/HeaderBar';

export const ComponentIdentifiers = {
  CircleHeader: 'CircleHeaderComponent',
  ImagePath: 'ImagePath',
  MainContainer:'MainContainer',
  Colors:'Colors',
  font_style:'font_style',
  Input:'Input',
  Button:'Button',
  KeyBoardType:'KeyBoardType',
  Header:'Header',
  HeaderBar:'HeaderBar'
};

export const ComponentView = {
  CircleHeader: CircleHeaderComponent,
  ImagePath: ImagePath,
  MainContainer:MainContainer,
  Colors:Colors,
  font_style:font_style,
  Input:Input,
  Button:Button,
  KeyBoardType:KeyBoardType,
  Header:Header,
  HeaderBar:HeaderBar
};
export default ComponentView;
