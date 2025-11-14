export function getDaysLeft(dueDateString) {
    const now = new Date(); 
    const dueDate = new Date(dueDateString);

    // milisegundos → días
    const msInOneDay = 1000 * 60 * 60 * 24;

    // diferencia
    const diffMs = dueDate - now;
    const diffDays = Math.ceil(diffMs / msInOneDay);

    return diffDays;
}