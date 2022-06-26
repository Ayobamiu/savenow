import type {
    CompositeScreenProps,
    NavigatorScreenParams,
  } from '@react-navigation/native';
  import type { StackScreenProps } from '@react-navigation/stack';
  import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NewSavings } from '../interfaces';
  
  export type RootStackParamList = {
    Yields: NavigatorScreenParams<YieldsTabParamList>;
    Savings: NavigatorScreenParams<SavingsTabParamList>;
    PostDetails: { id: string };
    NotFound: undefined;
    Profile: undefined;
  };
  
  export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;
  
  export type SavingsTabParamList = {
    PreveiwSavings: NewSavings; //Specifying undefined means that the route doesn't have params. 
    AddSavingsDetails: NewSavings; //Specifying undefined means that the route doesn't have params. 
    SavingsStrictLevel: NewSavings; //Specifying undefined means that the route doesn't have params. 
    ChooseSavingType: undefined; //Specifying undefined means that the route doesn't have params. 
    AddSavingScreen: undefined; //Specifying undefined means that the route doesn't have params. 
    SavingsScreen: undefined; //Specifying undefined means that the route doesn't have params. 
    SavingDetailsScreen: NewSavings;
  };
  
  export type SavingsTabScreenProps<T extends keyof SavingsTabParamList> =
    CompositeScreenProps<
      BottomTabScreenProps<SavingsTabParamList, T>,
      RootStackScreenProps<keyof RootStackParamList>
    >;
  export type YieldsTabParamList = {
    YieldsScreen: undefined; //Specifying undefined means that the route doesn't have params. 
    YieldDetailsScreen: { id: string, details?:string };
  };
  
  export type YieldsTabScreenProps<T extends keyof YieldsTabParamList> =
    CompositeScreenProps<
      BottomTabScreenProps<YieldsTabParamList, T>,
      RootStackScreenProps<keyof RootStackParamList>
    >;
    export type AuthTabParamList = {
      Login: undefined;
      TermsAndPolicy: undefined;
      SignUp: undefined;
      Onboarding: undefined;
      StartPasswordReset: undefined;
      ConfirmResetCode: undefined;
      ResetPassword: undefined;
    };

  export type AuthTabScreenProps<T extends keyof AuthTabParamList> =
    CompositeScreenProps<
      BottomTabScreenProps<AuthTabParamList, T>,
      RootStackScreenProps<keyof RootStackParamList>
    >;
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }
