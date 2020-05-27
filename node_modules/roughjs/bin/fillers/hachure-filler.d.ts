import { PatternFiller, RenderHelper } from './filler-interface';
import { ResolvedOptions, OpSet } from '../core';
import { Point } from '../geometry';
export declare class HachureFiller implements PatternFiller {
    private helper;
    constructor(helper: RenderHelper);
    fillPolygon(points: Point[], o: ResolvedOptions): OpSet;
    protected _fillPolygon(points: Point[], o: ResolvedOptions, connectEnds?: boolean): OpSet;
    private renderLines;
    private connectingLines;
    private midPointInPolygon;
    private splitOnIntersections;
}
