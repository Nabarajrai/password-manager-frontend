export const usePasswordGenerator = () => {
  // secure password generator
  function generateSecurePassword({
    length = 6,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  }) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+{}[]<>?/.,;:'|`~";

    let allChars = "";
    if (includeUppercase) allChars += uppercase;
    if (includeLowercase) allChars += lowercase;
    if (includeNumbers) allChars += numbers;
    if (includeSymbols) allChars += symbols;

    if (!allChars) {
      throw new Error("At least one character type must be selected");
    }

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % allChars.length;
      password += allChars[randomIndex];
    }

    return password;
  }

  // Strength meter
  function getPasswordStrength(password) {
    let score = 0;
    if (!password) return { score: 0, label: "Weak" };

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score > 5) score = 5;
    const labels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
    return { score, label: labels[score - 1] || "Weak" };
  }
  return { generateSecurePassword, getPasswordStrength };
};
