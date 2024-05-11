import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserInfo } from "../types/UserInfo";

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signup`, {
          name,
          email,
          password,
        })
      ).data,
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      mobile,
      password,
    }: {
      name: string;
      email: string;
      mobile: string;
      password: string;
    }) =>
      (
        await apiClient.put<UserInfo>(`api/users/profile`, {
          name,
          email,
          mobile,
          password,
        })
      ).data,
  });

  // export const useDeleteUserMutation = () => {
  //   return useMutation({
  //     mutationFn: async (userId: string) => { // Pass userId as an argument
  //       console.log('User ID:', userId); // Log the userId value
  //       const response = await apiClient.delete(`api/users/${userId}`);
  //       console.log('User ID:', userId);
  //       return response; // Consider returning the response for potential data handling
  //     },
  //   });
  // };
