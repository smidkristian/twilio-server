import { Meeting } from '../../src/controllers/Meeting';
import { ParticipantStatus, MeetingState, RoomStatus } from '../../src/enums';
import { Room, MeetingStorage } from './../../src/types';

const rooms: Room[] = [];
const pushRoom = (room: Room) => {
    rooms.push(room);
};

pushRoom({
    sid: 'asdasd',
    uniqueName: 'sadasdasd',
    status: RoomStatus.InProgress,
    participants: [{ id: 'asdasdas', name: 'honza', token: 'asd7898', status: ParticipantStatus.Waiting }],
});

const storage: MeetingStorage = {
    state: MeetingState.Pending,
    start: new Date().getTime(),
    rooms: rooms,
    allParticipants: [],
};

const meeting = new Meeting(storage);

export const resolvers = {
    Query: {
        token: (_: unknown, { identity, uniqueName }: { identity: string; uniqueName: string }) =>
            meeting.getToken({ identity, uniqueName }),
        room: (_: unknown, { sid }: { sid: string }) => meeting.getRoom(sid),
        rooms: () => meeting.getRooms(),
    },

    Mutation: {
        newRoom: async (_: unknown, { uniqueName }: { uniqueName: string }) => {
            return meeting.addRoom(uniqueName);
        },
    },
};
