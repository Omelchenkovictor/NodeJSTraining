"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorOut = errorOut;
function errorOut(err, _, res) {
    switch (err) {
        case '403':
            res.status(403).send({ ErrorMassage: "ERR_403_ACCESS_DENIED!!!111!!1!" });
            break;
        case '404':
            res.status(404).send({ ErrorMassage: "ERR_404_DATA_NOT_FOUND!!!111!!1!" });
            break;
        case '500':
            res.status(500).send({ ErrorMassage: "ERR_500_ALL_DEAD!!!111!!1!" });
            break;
        default:
            res.status(666).send({ ErrorMassage: "UNEXPECTED_ERROR!!!111!!1!" });
    }
}
