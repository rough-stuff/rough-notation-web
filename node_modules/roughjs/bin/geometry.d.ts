export declare type Point = [number, number];
export declare type Line = [Point, Point];
export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function rotatePoints(points: Point[], center: Point, degrees: number): void;
export declare function rotateLines(lines: Line[], center: Point, degrees: number): void;
export declare function lineLength(line: Line): number;
export declare function lineIntersection(a: Point, b: Point, c: Point, d: Point): Point | null;
export declare function isPointInPolygon(points: Point[], x: number, y: number): boolean;
export declare function doIntersect(p1: Point, q1: Point, p2: Point, q2: Point): boolean;
