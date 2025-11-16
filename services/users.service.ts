import { supabase } from "../lib/supabase";

class UsersService {

    async uploadProfileImage(
        fileName: string,
        buffer: ArrayBuffer,
        contentType: string
    ): Promise<string> {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            throw new Error('Usuario no autenticado');
        }

        const filePath = `${user.id}/${fileName}`;

        try {
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, buffer, {
                    contentType,
                    upsert: true,
                });

            if (uploadError) {
                throw new Error(`Error al subir imagen: ${uploadError.message}`);
            }

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(uploadData.path);

            const { error: updateError } = await supabase
                .from('users')
                .update({
                    avatar_url: publicUrl,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (updateError) {
                await supabase.storage
                    .from('avatars')
                    .remove([uploadData.path]);

                throw new Error(`Error al actualizar perfil: ${updateError.message}`);
            }

            return publicUrl;

        } catch (error) {
            console.error('❌ Error en uploadProfileImage:', error);
            throw error;
        }
    }

    async getUserStats() {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            throw new Error('Usuario no autenticado');
        }

        const { data, error } = await supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (error) {
            console.error('❌ Error al obtener estadísticas del usuario:', error);
            throw error;
        }

        return data;
    }

}

export const usersService = new UsersService();