export function createStyles(daysLeft) {

    // OVERDUE (rojo)
    if (daysLeft < 0) {
        return {
            container: "border border-red-500/60 bg-red-500/5",
            title: "text-red-300",
            dateText: "text-red-400 font-medium",
            dot: "opacity-70 text-red-400",
        };
    }

    // TOMORROW (naranja)
    if (daysLeft === 1) {
        return {
            container: "border border-orange-500/60 bg-orange-500/5",
            title: "text-orange-300",
            dateText: "text-orange-400 font-medium",
            dot: "opacity-70 text-orange-400",
        };
    }

    // SOON (menos de 7 días)
    if (daysLeft <= 7) {
        return {
            container: "border border-yellow-500/50 bg-yellow-500/5",
            title: "text-yellow-200",
            dateText: "text-yellow-400 font-medium",
            dot: "opacity-70 text-yellow-400",
        };
    }

    // DEFAULT (normal, azul)
    return {
        container: "border border-white/10 bg-white/5",
        title: "text-white",
        dateText: "text-gray-300",
        dot: "opacity-50 text-gray-300",
    };
}