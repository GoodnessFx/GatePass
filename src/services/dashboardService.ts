import axios from 'axios';
import { API_BASE_URL } from '../constants';

const API_URL = API_BASE_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface DashboardStats {
  totalRevenue: number;
  ticketsSold: number;
  activeEvents: number;
  totalEvents: number;
  revenueGrowth: number;
  ticketsGrowth: number;
  recentSales: Array<{
    id: string;
    buyer: string;
    amount: number;
    tickets: number;
    timestamp: string;
    eventName: string;
  }>;
}

export interface DashboardEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: string;
  ticketsSold: number;
  totalTickets: number;
  revenue: number;
  ticketPrice: number;
  attendees: number;
  image?: string;
}

export const getOrganizerStats = async (): Promise<DashboardStats> => {
  try {
    const response = await axios.get(`${API_URL}/analytics/organizer/stats`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    throw error;
  }
};

export const getOrganizerEvents = async (): Promise<DashboardEvent[]> => {
  try {
    const response = await axios.get(`${API_URL}/events/my-events`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch organizer events:', error);
    throw error;
  }
};
