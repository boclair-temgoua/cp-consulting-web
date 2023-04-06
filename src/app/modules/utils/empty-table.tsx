import { toAbsoluteUrl } from '../../../_metronic/helpers/AssetHelpers';


export const EmptyTable: React.FC<{ name: string }> = ({ name }) => {
    return (
        <tr className="odd">
            <td colSpan={10} className="dataTables_empty">
                <div className="d-flex flex-column flex-center">
                    <img src={toAbsoluteUrl('/media/illustrations/sketchy-1/5.png')} className="mw-200px" />
                    <div className="fs-1 fw-bolder text-dark mb-4">No {name}.</div>
                    <div className="fs-6">Start creating new {name}</div>
                </div>
            </td>
        </tr>
    );
};