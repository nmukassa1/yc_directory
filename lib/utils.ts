export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-UK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  
  export function cn(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(" ");
  }
  