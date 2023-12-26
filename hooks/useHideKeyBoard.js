import { Keyboard } from "react-native";
import { useEffect } from "react";

const useHideKeyBoard = (setHide) => {
  useEffect(() => {
    // Add event listener for keyboard dismissal
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setHide(false);
      }
    );

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setHide(true);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
};

export default useHideKeyBoard;
