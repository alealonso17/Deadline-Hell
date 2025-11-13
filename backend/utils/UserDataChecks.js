class UserDataChecks {

    // ============================
    // USERNAME CHECK
    // ============================
    static username(username) {
        if (!username || username.trim().length === 0) {
            return { valid: false, message: "El nombre de usuario no puede estar vacío." };
        }

        if (username.length < 3) {
            return { valid: false, message: "El nombre de usuario es demasiado corto (mínimo 3 caracteres)." };
        }

        if (username.length > 20) {
            return { valid: false, message: "El nombre de usuario es demasiado largo (máximo 20 caracteres)." };
        }

        // Solo letras, números, puntos y guiones
        if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
            return { valid: false, message: "El usuario solo puede contener letras, números, puntos y guiones." };
        }

        return { valid: true };
    }

    // ============================
    // PASSWORD CHECK
    // ============================
    static password(password) {
        if (!password) {
            return { valid: false, message: "La contraseña no puede estar vacía." };
        }

        if (password.length < 6) {
            return { valid: false, message: "La contraseña es demasiado corta (mínimo 6 caracteres)." };
        }

        if (password.length > 50) {
            return { valid: false, message: "La contraseña es demasiado larga (máximo 50 caracteres)." };
        }

        // Debe tener 1 número mínimo
        if (!/\d/.test(password)) {
            return { valid: false, message: "La contraseña debe tener al menos un número." };
        }

        // Debe tener 1 letra minúscula y 1 mayúscula
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            return { valid: false, message: "La contraseña debe tener mayúsculas y minúsculas." };
        }

        return { valid: true };
    }

    // ============================
    // EMAIL CHECK
    // ============================
    static email(email) {
        if (!email || email.trim().length === 0) {
            return { valid: false, message: "El email no puede estar vacío." };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return { valid: false, message: "El formato del email no es válido." };
        }

        return { valid: true };
    }

}

export default UserDataChecks;