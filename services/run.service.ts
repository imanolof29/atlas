import { supabase } from "../lib/supabase";
import { encodePolyline } from "../utils/polyline";

class RunService {

    async postRun(data: any): Promise<void> {
        try {
            const { error } = await supabase.from('runs').insert({
                'distance': data.distance,
                'duration': data.duration,
                'pace': data.pace,
                'user_id': data.userId,
                'route': encodePolyline(data.locations),
                'started_at': new Date(),
                'ended_at': new Date(),
            })
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error posting run data:', error);
            throw error;
        }
    }

    async getUserRuns(userId: string): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('runs')
                .select('*')
                .eq('user_id', userId)
                .order('started_at', { ascending: false });

            if (error) {
                throw error;
            }
            return data || [];
        } catch (error) {
            console.error('Error fetching user runs:', error);
            throw error;
        }
    }

}

export const runService = new RunService();