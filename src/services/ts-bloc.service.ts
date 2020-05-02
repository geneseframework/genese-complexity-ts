// import * as ts from 'typescript';
// import { TsBloc } from '../models/ts-bloc.model';
//
// export class TsBlocService {
//
//     static getBloc(tsBloc: TsBloc): TsBloc {
//         const bloc: TsBloc = new TsBloc();
//         ts.forEachChild(tsBloc.node, (childBloc: TsBloc) => {
//             const newBloc: TsBloc = new TsBloc();
//             newBloc.node = node;
//             newBloc.depth = tsBloc.depth ++;
//             newBloc.parent = tsBloc
//             console.log('NEWBLOC', newBloc);
//             const childBloc: TsBloc = TsBlocService.getBloc(newBloc);
//             bloc.children.push(childBloc);
//         });
//         console.log('BLOC', bloc);
//         bloc.node = tsBloc.node;
//         return bloc;
//     }
// }
