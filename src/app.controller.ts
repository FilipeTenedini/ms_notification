import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

export type TaskUserEntity = {
  id: string;
  userId: string;
  taskId: string;
  createdAt: Date;
  user?: {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    avatarUrl: string;
    createdAt: string;
  };
  task?: {
    id: string;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    status: 'PENDING' | 'COMPLETED' | 'ONGOING';
  };
};

@Controller()
export class AppController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('task_notification')
  async taskNotification(data: TaskUserEntity) {
    await this.mailerService.sendMail({
      to: data.user?.email,
      from: 'taskmanager@taskmanager.net',
      subject: 'Notificação de Tarefa',
      text: `Olá ${data?.user?.name}! Você tem atividade que se inicia as ${data.task?.startAt} e finaliza as ${data.task?.endAt}`,
    });
  }
}
