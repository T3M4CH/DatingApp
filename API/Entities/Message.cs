﻿namespace API.Entities;

public class Message
{
    public int Id { get; set; }
    public int SenderId { get; set; }
    public string SenderUsername { get; set; } = string.Empty;
    public AppUser Sender { get; set; }
    public int RecipientId { get; set; }
    public string RecipientUsername { get; set; } = string.Empty;
    public AppUser Recipient { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime? DateRead { get; set; }
    public DateTime? MessageSent { get; set; } = DateTime.UtcNow;
    public bool SenderDeleted { get; set; }
    public bool RecipientDeleted { get; set; }
}