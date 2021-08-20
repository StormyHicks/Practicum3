import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Score = ({ scoreId, categoryId, categoryName, scoreNum, scoreTotal }) => {
    return (
        <TableRow key={scoreId}>
            <TableCell component="th" scope="row">
            {categoryName}
            </TableCell>
            <TableCell align="right">{scoreNum} / {scoreTotal}</TableCell>
            <TableCell align="right">
                <Button className="playButton" href={"http://localhost:3000/quiz/" + categoryId + "/" + scoreTotal}>PLAY</Button>
            </TableCell>
        </TableRow>
    )
}

export default Score
