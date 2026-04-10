import { getStoredToken } from './authService';

// API Base URL — set EXPO_PUBLIC_API_URL in your local .env file.
// See frontend/.env.example for instructions.
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api';

// Types
export interface Resource {
  _id: string;
  title: string;
  url: string;
  description?: string;
  hashtags: string[];
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  hashtags: string[];
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  rsvpCount: number;
  isRsvped: boolean;
  scoreboardCategory: string | null;
}

// Faculty: Create a resource
export const createResource = async (data: {
  title: string;
  url: string;
  description?: string;
  hashtags?: string[];
}): Promise<{ success: boolean; resource?: Resource; error?: string }> => {
  try {
    console.log('Creating resource with data:', data);
    const token = await getStoredToken();
    console.log('Token exists:', !!token);
    
    const response = await fetch(`${API_URL}/resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);
    const result = await response.json();
    console.log('Response data:', result);

    if (response.ok) {
      return { success: true, resource: result.resource };
    } else {
      return { success: false, error: result.message || 'Failed to create resource' };
    }
  } catch (error: any) {
    console.error('Create resource error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};

// Faculty: Create an event
export const createEvent = async (data: {
  title: string;
  date: string;
  location?: string;
  description?: string;
  hashtags?: string[];
  scoreboardCategory?: string | null;
}): Promise<{ success: boolean; event?: Event; error?: string }> => {
  try {
    console.log('Creating event with data:', data);
    const token = await getStoredToken();
    console.log('Token exists:', !!token);
    
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);
    const result = await response.json();
    console.log('Response data:', result);

    if (response.ok) {
      return { success: true, event: result.event };
    } else {
      return { success: false, error: result.message || 'Failed to create event' };
    }
  } catch (error: any) {
    console.error('Create event error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};

// Faculty: Update a resource
export const updateResource = async (
  id: string,
  data: {
    title: string;
    url: string;
    description?: string;
    hashtags?: string[];
  }
): Promise<{ success: boolean; resource?: Resource; error?: string }> => {
  try {
    console.log('Updating resource with id:', id, 'data:', data);
    const token = await getStoredToken();
    console.log('Token exists for update:', !!token);
    
    const response = await fetch(`${API_URL}/resources/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log('Update response status:', response.status);
    const result = await response.json();
    console.log('Update response data:', result);

    if (response.ok) {
      return { success: true, resource: result.resource };
    } else {
      return { success: false, error: result.message || 'Failed to update resource' };
    }
  } catch (error: any) {
    console.error('Update resource error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};

// Faculty: Delete a resource
export const deleteResource = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Deleting resource with id:', id);
    const token = await getStoredToken();
    console.log('Token exists for delete:', !!token);
    
    const response = await fetch(`${API_URL}/resources/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Delete response status:', response.status);
    const result = await response.json();
    console.log('Delete response data:', result);

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: result.message || 'Failed to delete resource' };
    }
  } catch (error: any) {
    console.error('Delete resource error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};

// Faculty: Update an event
export const updateEvent = async (
  id: string,
  data: {
    title: string;
    date: string;
    location?: string;
    description?: string;
    hashtags?: string[];
    scoreboardCategory?: string | null;
  }
): Promise<{ success: boolean; event?: Event; error?: string }> => {
  try {
    console.log('Updating event with id:', id, 'data:', data);
    const token = await getStoredToken();
    console.log('Token exists for update:', !!token);
    
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log('Update response status:', response.status);
    const result = await response.json();
    console.log('Update response data:', result);

    if (response.ok) {
      return { success: true, event: result.event };
    } else {
      return { success: false, error: result.message || 'Failed to update event' };
    }
  } catch (error: any) {
    console.error('Update event error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};

// Faculty: Delete an event
export const deleteEvent = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Deleting event with id:', id);
    const token = await getStoredToken();
    console.log('Token exists for delete:', !!token);
    
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Delete response status:', response.status);
    const result = await response.json();
    console.log('Delete response data:', result);

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: result.message || 'Failed to delete event' };
    }
  } catch (error: any) {
    console.error('Delete event error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};

// Student: Get all resources (optionally filter by hashtag)
export const getResources = async (
  hashtag?: string
): Promise<{ success: boolean; resources?: Resource[]; error?: string }> => {
  try {
    const token = await getStoredToken();
    const url = hashtag
      ? `${API_URL}/resources?hashtag=${encodeURIComponent(hashtag)}`
      : `${API_URL}/resources`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, resources: result.resources };
    } else {
      return { success: false, error: result.message || 'Failed to fetch resources' };
    }
  } catch (error) {
    console.error('Get resources error:', error);
    return { success: false, error: 'Network error' };
  }
};

// Student: Get all events (optionally filter by hashtag)
export const getEvents = async (
  hashtag?: string
): Promise<{ success: boolean; events?: Event[]; error?: string }> => {
  try {
    const token = await getStoredToken();
    const url = hashtag
      ? `${API_URL}/events?hashtag=${encodeURIComponent(hashtag)}`
      : `${API_URL}/events`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, events: result.events };
    } else {
      return { success: false, error: result.message || 'Failed to fetch events' };
    }
  } catch (error) {
    console.error('Get events error:', error);
    return { success: false, error: 'Network error' };
  }
};

// Student: Get all hashtags
export const getHashtags = async (): Promise<{
  success: boolean;
  hashtags?: string[];
  error?: string;
}> => {
  try {
    const token = await getStoredToken();
    const response = await fetch(`${API_URL}/hashtags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, hashtags: result.hashtags };
    } else {
      return { success: false, error: result.message || 'Failed to fetch hashtags' };
    }
  } catch (error) {
    console.error('Get hashtags error:', error);
    return { success: false, error: 'Network error' };
  }
};

// RSVP to an event
export const rsvpEvent = async (
  eventId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const token = await getStoredToken();
    const response = await fetch(`${API_URL}/events/${eventId}/rsvp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      const result = await response.json();
      return { success: false, error: result.message || 'Failed to RSVP' };
    }
  } catch (error) {
    console.error('RSVP error:', error);
    return { success: false, error: 'Network error' };
  }
};

// Cancel RSVP to an event
export const cancelRsvp = async (
  eventId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const token = await getStoredToken();
    const response = await fetch(`${API_URL}/events/${eventId}/rsvp`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      const result = await response.json();
      return { success: false, error: result.message || 'Failed to cancel RSVP' };
    }
  } catch (error) {
    console.error('Cancel RSVP error:', error);
    return { success: false, error: 'Network error' };
  }
};

