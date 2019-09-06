export function getSelectText(): string {
    // @ts-ignore
    if (document.selection) {
        // @ts-ignore
        return document.selection.createRange().text;
    } else {
        // @ts-ignore
        return window.getSelection().toString();
    }
}
