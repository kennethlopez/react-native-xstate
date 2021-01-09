function dimensions(top: number, right: number = top, bottom: number = top, left: number = right, property: string) {
    let styles: any = {};

    styles[`${property}Top`] = top;
    styles[`${property}Right`] = right;
    styles[`${property}Bottom`] = bottom;
    styles[`${property}Left`] = left;

    return styles;
}

export function margin(top: number, right: number, bottom: number, left: number) {
    return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top: number, right: number, bottom: number, left: number) {
    return dimensions(top, right, bottom, left, 'padding');
}
