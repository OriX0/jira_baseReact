/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}